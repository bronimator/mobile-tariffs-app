import { SocialType } from "../../lib/enums";
import "./index.css";

export interface SocialButtonProps {
    img: string,
    price: number,
    type: SocialType,
    img_off: string,
    currentSelected: boolean | undefined,
    onClick: (type: any) => void,
}

const SocialButton = (props: SocialButtonProps) => {
    const { currentSelected, img, price, img_off, onClick, type } = props;

    return (
        <div
            className={"button"}
            onClick={() => onClick(type)}
            style={{ background: currentSelected ? 'white' : 'none' }}
        >
            <img
                src={currentSelected ? img : img_off}
                className="image"
            />
            <div className="price">{price} ₽</div>
        </div>

    )
};

export default SocialButton;