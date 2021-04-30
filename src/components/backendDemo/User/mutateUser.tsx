import React, { useImperativeHandle } from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import { EmptyField } from 'common';
import { UserType, IMutateUserResult, IUserMutateFormData, IUserMutateRef, IAddUserProps } from './interface';
import { addUserService, updateUserService } from './services';

const { Item: FormItem } = Form;

export default function addUser(props: IAddUserProps): Promise<IMutateUserResult> {
  const contentRef = React.createRef<IUserMutateRef>();
  return new Promise((resolve) => {
    Modal.confirm({
      title: 'Add User',
      icon: <></>,
      content: (
        <ModalContentComp
          ref={contentRef}
          {...props}
        />
      ),
      onOk: (): Promise<void> => new Promise((okRes, okRej) => {
        contentRef.current?.handleSubmit().then((data) => {
          const mutateService = data.id ? updateUserService : addUserService;
          mutateService(data).then((id) => {
            okRes();
            resolve({
              action: 'submit',
              result: id,
            });
          }).catch(() => {
            okRej();
          });
        }).catch(() => {
          okRej();
        });
      }),
    });
  });
}

const ModalContentComp = React.forwardRef((props: IAddUserProps, ref: React.Ref<IUserMutateRef>) => ModalContent(props, ref));

function ModalContent(props: IAddUserProps, ref: React.Ref<IUserMutateRef>): JSX.Element {
  const [form] = Form.useForm<IUserMutateFormData>();
  const { detail } = props;

  useImperativeHandle(ref, (): IUserMutateRef => ({
    handleSubmit: (): Promise<IUserMutateFormData> => new Promise((resolve, reject) => {
      form.validateFields().then((data) => {
        resolve(data);
      }).catch(() => {
        reject();
      });
    }),
  }));

  return (
    <Form form={form} initialValues={detail}>
      <FormItem name="id">
        <EmptyField />
      </FormItem>
      <FormItem name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </FormItem>
      <FormItem name="email" label="E-mail" rules={[{ required: true }]}>
        <Input />
      </FormItem>
      <FormItem name="type" label="Type" rules={[{ required: true }]}>
        <Select>
          {Object.keys(UserType).map(item => (
            <Select.Option value={UserType[item]} key={UserType[item]}>
              {UserType[item]}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
      <FormItem name="groupId" label="Group" rules={[{ required: true }]}>
        <InputNumber />
      </FormItem>
    </Form>
  );
}
