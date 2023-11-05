import { Popover, Button, Text, PopoverProps } from "@nextui-org/react";
import { Props } from "@nextui-org/react/types/input/input-props";

interface PopoverModelProps {
  handleClickConfirm: () => void;
  icon: React.ReactNode;
  text: string;
  color: Props["color"];
  rest?: typeof Popover;
}

export const PopoverModel= ({handleClickConfirm, icon, text, color, ...rest}: PopoverModelProps) => {
  return (
    <Popover
      isBordered
      {...rest}
    >
      <Popover.Trigger>
        <Text title="icon-delete" color={color} h5>{icon}</Text>
      </Popover.Trigger>
      <Popover.Content>
        <Button title="confirm-delete" className="confirm-delete" color={color} onClick={handleClickConfirm}>
          {text}
        </Button>
      </Popover.Content>
    </Popover>
  );
};
