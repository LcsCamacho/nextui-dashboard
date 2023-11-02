import { Popover, Button, Text } from "@nextui-org/react";
import { Props } from "@nextui-org/react/types/input/input-props";

interface PopoverModelProps {
  handleClickConfirm: () => void;
  icon: React.ReactNode;
  text: string;
  color: Props["color"];
}

export const PopoverModel= ({handleClickConfirm, icon, text, color}: PopoverModelProps) => {
  return (
    <Popover
      isBordered
      
    >
      <Popover.Trigger>
        <Text color={color} h5>{icon}</Text>
      </Popover.Trigger>
      <Popover.Content>
        <Button color={color} onClick={handleClickConfirm}>
          {text}
        </Button>
      </Popover.Content>
    </Popover>
  );
};
