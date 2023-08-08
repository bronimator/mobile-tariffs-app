import React, { useState } from "react";
import { Form, Input, Typography, Button, FormInstance, Select, Slider, Checkbox } from 'antd';
// import Button from "../../common/Button";
import { Content } from "antd/es/layout/layout";
import "./index.css";
import InputMask from 'react-input-mask';
import type { SliderMarks } from 'antd/es/slider';
import { SocialType } from "../../lib/enums";
import SocialButton from "../../common/SocialButton";
import { useAppSelector } from "../../app/hooks";
import { selectTariffs } from "../../app/mobileTariffSlice";

const { Title } = Typography;

const Home = () => {
    const tariff = useAppSelector(selectTariffs);

    const [facebookState, setFacebookState] = useState(false);
    const [vkState, setVkState] = useState(false);
    const [okState, setOkState] = useState(false);
    const [instagramState, setInstagramState] = useState(false);
    const [tiktokState, setTiktokState] = useState(false);

    type FieldType = {
        phone?: string;
        operator?: string;
        minutes?: string;
        internet?: string;
        rentRouter?: string;
        buyRouter?: string;
    };

    const formRef = React.createRef<FormInstance>();

    const operators = [
        {
            value: '1',
            label: 'Оператор 1',
        },
        {
            value: '2',
            label: 'Оператор 2',
        },
        {
            value: '3',
            label: 'Оператор 3',
        },
    ];

    const switchCheckBox = (fieldName: string) => {
        return () => {
            const value = formRef.current?.getFieldValue(fieldName);
            formRef.current?.setFieldValue(fieldName, !value);
        };
    }

    const isSelected = (type: SocialType) => {
        switch (type) {
            case SocialType.FACEBOOK:
                return facebookState;
            case SocialType.INSTAGRAM:
                return instagramState;
            case SocialType.OK:
                return okState;
            case SocialType.TIKTOK:
                return tiktokState;
            case SocialType.VK:
                return vkState;
            default:
                break;
        }
    }

    const switchSocial = (type: SocialType) => {
        switch (type) {
            case SocialType.FACEBOOK:
                alert(facebookState);
                setFacebookState(!facebookState);
                break;
            case SocialType.INSTAGRAM:
                setInstagramState(!instagramState);
                break;
            case SocialType.OK:
                setOkState(!okState);
                break;
            case SocialType.TIKTOK:
                setTiktokState(!tiktokState);
                break;
            case SocialType.VK:
                setVkState(!vkState);
                break;
            default:
                break;
        }
    }

    const onFinish = () => {
        formRef.current!.validateFields().then(values => {
            alert(JSON.stringify(values));
        });
    }

    const phoneValidator = (rule: any, value: string, callback: any) => {
        if (!value || value.includes('_')) {
            callback('Обязательно для заполнения');
        } else {
            callback();
        }
    }

    const operatorValidator = (rule: any, value: string, callback: any) => {
        if (!value) {
            callback('Обязательно для заполнения');
        } else {
            callback();
        }
    }

    const marks: SliderMarks = {
        200: '200 мин',
        350: '350',
        600: '600',
        650: '650',
    };

    const internetMarks: SliderMarks = {
        5: '5 Гб',
        15: '15',
        30: '30',
        35: '35',
    };

    return (
        <Content className="home">
            <Title className="title">Настройте тариф</Title>
            <Form
                name="basic"
                ref={formRef}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item<FieldType>
                    name="phone"
                    label="Телефон"
                    style={{ maxWidth: 200 }}
                    rules={[{
                        message: 'Обязательное поле!', validator: phoneValidator
                    }]}
                >
                    <InputMask
                        className="phoneInput"
                        ref={(input: any) => { }}
                        mask={'+7(999)999-99-99'}
                        placeholder={"+7(___)__-__-__"}
                    >
                    </InputMask>
                </Form.Item>

                <Form.Item<FieldType>
                    name="operator"
                    label="Оператор"
                    style={{ maxWidth: 200 }}
                    rules={[{
                        message: 'Обязательное поле!', validator: operatorValidator
                    }]}
                >
                    <Select
                        style={{ width: 120 }}
                        options={operators}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    name="minutes"
                    label="Минуты"
                    initialValue={600}
                >
                    <Slider
                        marks={marks}
                        min={200}
                        max={650}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    name="internet"
                    label="Интернет"
                    initialValue={15}
                    className="internetSlider"
                >
                    <Slider
                        marks={internetMarks}
                        min={5}
                        max={35}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    name="rentRouter"
                    label="Wi-Fi роутер"
                    initialValue={false}
                >
                    <Checkbox onClick={switchCheckBox('rentRouter')} /><span>Аренда <strong>99</strong> ₽/мес.</span>
                </Form.Item>

                <Form.Item<FieldType>
                    name="buyRouter"
                    initialValue={false}
                >
                    <Checkbox onClick={switchCheckBox('buyRouter')} /><span>Выкупить <strong>2 600</strong> ₽</span>
                </Form.Item>

                <label>Соцсети</label>
                <div className="socialsGroup">
                    {tariff.socials!.map(x => {
                        return (
                            <SocialButton onClick={switchSocial} currentSelected={isSelected(x.type)} {...x} />
                        );
                    })}
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="submitButton">
                        <strong>480 ₽</strong> в месяц
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
};

export default Home;