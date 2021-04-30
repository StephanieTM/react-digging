import React from 'react';
import { useAsyncRetry } from 'react-use';
import dayjs from 'dayjs';
import { Button, message, Table, Space, Modal } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import mutateUser from './mutateUser';
import { deleteUserService, getAllUsersService } from './services';
import { IUser } from './interface';

export default function BackendDemo(): JSX.Element {
  const { value: userList = [], loading, retry: refetch } = useAsyncRetry(
    () => getAllUsersService(),
    []
  );

  const columns: ColumnsType<IUser> = [{
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Type',
    dataIndex: 'type',
  }, {
    title: 'E-mail',
    dataIndex: 'email',
  }, {
    title: 'Created At',
    dataIndex: 'createdAt',
    render: (text): string => {
      return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
    },
  }, {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    render: (text): string => {
      return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
    },
  }, {
    title: 'Action',
    dataIndex: 'action',
    render: (_text, record): JSX.Element => {
      const editBtn = <Button key="editBtn" onClick={(): void => handleEditUser(record)}>Edit</Button>;
      const deleteBtn = <Button key="deleteBtn" onClick={(): void => handleDeleteUser(record)}>Delete</Button>;
      const btns = [editBtn, deleteBtn];

      return (
        <Space>
          {btns.map(item => item)}
        </Space>
      );
    },
  }];

  function handleAddUser(): void {
    mutateUser({}).then(({ action, result }) => {
      if (action === 'submit' && result) {
        message.success(`user ID: [${result}] created`);
        refetch();
      }
    });
  }

  function handleEditUser(record: IUser): void {
    mutateUser({ detail: record }).then(({ action, result }) => {
      if (action === 'submit' && result) {
        message.success(`user ID: [${result}] updated`);
        refetch();
      }
    });
  }

  function handleDeleteUser({ id }: IUser): void {
    Modal.confirm({
      title: 'Delete User',
      content: 'Confirm to delete the user?',
      onOk: () => {
        deleteUserService({ id }).then(() => {
          message.success(`user ID: [${id}] deleted`);
          refetch();
        });
      },
    });
  }

  return (
    <div>
      <div className="mb-4 text-lg">This page shows a simple user-management demo with nodejs backend.</div>
      <div className="mb-4">
        <Button type="primary" onClick={handleAddUser}>Add User</Button>
      </div>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={userList || []}
        columns={columns}
      />
    </div>
  );
}
