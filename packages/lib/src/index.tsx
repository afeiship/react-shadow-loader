import cx from 'classnames';
import VisibleElement from '@jswork/visible-element';
import React, { Component, HTMLAttributes, ReactNode } from 'react';
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
   * The style of the component.
   */
  loader?: ReactNode;
  /**
   * Whether the overlay can be through or not.
   */
  permeable?: boolean;
  /**
   * Whether the shadowy effect is enabled or not.
   */
  shadowy?: boolean;
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
    loader: <img className="is-svg-spinner" src={SpinnerSvg} alt="loading" />,
  };

  private rootRef = React.createRef<HTMLDivElement>();
  private rootVe: VisibleElement = null as any;

  get isDefaultSpinner() {
    return this.props.loader === ReactShadowLoader.defaultProps.loader;
  }

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
    const { className, visible, fixed, style, zIndex, loader, permeable, shadowy, ...rest } = this.props;

    return (
      <div
        ref={this.rootRef}
        hidden
        data-component={CLASS_NAME}
        data-permeable={permeable}
        data-shadowy={shadowy}
        data-fixed={fixed}
        className={cx(CLASS_NAME, className)}
        style={{
          zIndex,
          ...style,
        }}
        {...rest}
      >
        <div className={cx(`${CLASS_NAME}__spinner`, { 'is-default-spinner': this.isDefaultSpinner })} style={{
          zIndex: zIndex! + 1,
        }}>
          {loader}
        </div>
      </div>
    );
  }
}
