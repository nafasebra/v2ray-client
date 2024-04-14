interface BackgroundStyleProps {
  styleName: string;
}

function BackgroundStyle(props: BackgroundStyleProps) {
  const { styleName } = props;

  return (
    <style>{`
      html,
      body {
        background-image: var(--${styleName}-bg-mobile);
      }

      @media screen and (min-width: 768px) {
        html,
        body {
          background-image: var(--${styleName}-bg-tablet);
        }
      }

      @media screen and (min-width: 1280px) {
        html,
        body {
          background-image: var(--${styleName}-bg-desktop);
        }
      }
    `}</style>
  );
}

export default BackgroundStyle;
