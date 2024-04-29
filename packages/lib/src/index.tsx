import cx from 'classnames';
import VisibleElement, { VisibleState } from '@jswork/visible-element';
import React, { Component, HTMLAttributes } from 'react';
// @ts-ignore
import SpinnerSvg from './spinner-1s-200px.svg?svgr';

const CLASS_NAME = 'react-shadow-loader';
const VERSION = '__VERSION__';

export type ReactShadowLoaderProps = {
  /**
   * Additional CSS class names to apply to the component.
   */
  className?: string;
  /**
   * The visible value.
   */
  visible?: boolean;
  /**
   * The show callback.
   */
  onClose?: () => void;
  /**
   * We can use fixed position or absolute position.
   */
  fixed?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default class ReactShadowLoader extends Component<ReactShadowLoaderProps> {
  static displayName = CLASS_NAME;
  static version = VERSION;
  static defaultProps = {
    visible: false,
    fixed: false,
  };

  private rootRef = React.createRef<HTMLDivElement>();
  private spinnerRef = React.createRef<HTMLImageElement>();
  private rootVe: VisibleElement;
  private spinnerVe: VisibleElement;

  componentDidMount() {
    const { visible } = this.props;
    const { current } = this.rootRef;
    if (!current) return;
    this.rootVe = new VisibleElement(current, { onChange: this.handleVeChange });
    this.spinnerVe = new VisibleElement(this.spinnerRef.current!);
    this.rootVe.to(visible!);
    this.spinnerVe.to(visible!);
  }

  shouldComponentUpdate(nextProps: ReactShadowLoaderProps) {
    console.log('nextPRos:', nextProps);
    const { visible } = nextProps;
    this.rootVe.to(visible!);
    this.spinnerVe.to(visible!);
    return true;
  }

  handleVeChange = (status: VisibleState) => {
    if (status === 'closed') this.props.onClose?.();
  };

  render() {
    const { className, visible, fixed, ...rest } = this.props;

    return (
      <div
        ref={this.rootRef}
        data-component={CLASS_NAME}
        data-fixed={fixed}
        className={cx(CLASS_NAME, className)}
        {...rest}
      >
        <img ref={this.spinnerRef} className={`${CLASS_NAME}__spinner`} src={SpinnerSvg} alt="loading"
             role="spinbutton" />
      </div>
    );
  }
}
