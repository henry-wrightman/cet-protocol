import { FunctionComponent, useState } from "react";
import { WagerConfirmationModal } from "./WagerConfirmationModal";

type WagerConfirmationButtonProps = {
  title?: string;
  subheader?: string;
  wager: any;
  children: React.ReactElement<any>;
  trigger: React.ReactElement<any>;
};

export const WagerConfirmationButton: FunctionComponent<
  WagerConfirmationButtonProps
> = ({ title, subheader, wager, children, trigger }) => {
  const [helpShown, showHelpModal] = useState(false);

  // override onClick with modal triggering
  trigger = {
    ...trigger,
    props: { ...trigger.props, onClick: () => showHelpModal(!helpShown) },
  };

  return (
    <>
      {helpShown && (
        <WagerConfirmationModal
          title={title}
          subheader={subheader}
          wager={wager}
          onClose={() => showHelpModal(!helpShown)}
        >
          {children}
        </WagerConfirmationModal>
      )}
      {trigger}
    </>
  );
};
