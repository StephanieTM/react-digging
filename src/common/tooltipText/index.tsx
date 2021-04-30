/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'antd';
import { ITooltipTextProps } from './interface';
import './index.less';

export default function TooltipText(props: ITooltipTextProps): JSX.Element {
  const { title, content } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect((): () => void => {
    contentRef.current?.addEventListener('mouseover', showTooltip);
    contentRef.current?.addEventListener('mouseleave', removeTooltip);

    return ((): void => {
      contentRef.current?.removeEventListener('mouseover', showTooltip);
      contentRef.current?.removeEventListener('mouseleave', removeTooltip);  
    });
  }, []);

  function showTooltip(e: Event): void {
    const { currentTarget } = e;
    if (currentTarget) {
      const { clientWidth, scrollWidth } = currentTarget as Element;
      setVisible(scrollWidth > clientWidth);
    }
  }

  function removeTooltip(): void {
    setVisible(false);
  }
  
  return (
    <Tooltip title={title||content} visible={visible}>
      <div ref={contentRef} className="tooltip-text-content">
        {content}
      </div>
    </Tooltip>
  );
}
