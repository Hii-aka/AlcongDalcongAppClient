import HeaderButton from "../common/HeaderButton";
import { FontAwesome } from '@expo/vector-icons';

function AddCalendarHeaderRight(onSubmit:() => void) {
  return <HeaderButton icon={<FontAwesome name="pencil" size={22} color="black" />} onPress={onSubmit} />;
}

export default AddCalendarHeaderRight;
