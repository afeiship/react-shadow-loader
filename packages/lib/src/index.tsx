import cx from 'classnames';
import VisibleElement from '@jswork/visible-element';
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
   * We can use fixed position or absolute position.
   */
  fixed?: boolean;
  /**
   * The z-index value.
   */
  zIndex?: number;
} & HTMLAttributes<HTMLDivElement>;

export default class ReactShadowLoader extends Component<ReactShadowLoaderProps> {
  static displayName = CLASS_NAME;
  static version = VERSION;
  static defaultProps = {
    visible: false,
    fixed: false,
    zIndex: 100,
  };

  private rootRef = React.createRef<HTMLDivElement>();
  private rootVe: VisibleElement = null as any;

  componentDidMount() {
    const { visible } = this.props;
    const { current } = this.rootRef;
    if (!current) return;
    this.rootVe = new VisibleElement(current);
    this.rootVe.to(visible!);
  }

  componentDidUpdate(prevProps: ReactShadowLoaderProps) {
    const { visible } = this.props;
    if (visible === prevProps.visible) return;
    this.rootVe?.to(visible!);
  }

  render() {
    const { className, visible, fixed, style, zIndex, ...rest } = this.props;

    return (
      <div
        ref={this.rootRef}
        data-component={CLASS_NAME}
        data-fixed={fixed}
        className={cx(CLASS_NAME, className)}
        style={{
          zIndex,
          ...style,
        }}
        {...rest}
      >
        <div className={`${CLASS_NAME}__spinner`} style={{
          zIndex: zIndex! + 1,
        }}>
          <img src={SpinnerSvg} alt="loading" />
        </div>
      </div>
    );
  }
}
