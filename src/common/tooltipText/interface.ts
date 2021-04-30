export interface ITooltipTextProps {
  /** 标题，如未指定则取content */
  title?: JSX.Element|string;

  /** 内容 */
  content: JSX.Element|string;
}
