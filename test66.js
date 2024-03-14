// 父组件
import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import StepChild from './StepChild';

const ParentComponent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [userData, setUserData] = useState({});

    const handleStepChange = (index) => {
        setActiveIndex(index);
    };

    const handleUserDataChange = (stepData) => {
        setUserData(prevData => ({ ...prevData, ...stepData }));
    };

    return (
        <>
            <Steps model={items} activeIndex={activeIndex} readOnly={false} onItemClick={handleStepChange} />
            <div className="p-grid p-fluid">
                <StepChild step={0} onDataChange={handleUserDataChange} />
                {/* 添加其他子组件 */}
            </div>
            {/* 在这里可以使用 userData 对象，其中包含了所有子组件的数据 */}
        </>
    );
}

export default ParentComponent;


// 子组件 StepChild.js
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';

const StepChild = ({ step, onDataChange }) => {
    const [formData, setFormData] = useState({
        input1: '',
        input2: '',
        // 这里添加其他的 input 数据
        input10: ''
    });

    const handleInputChange = (e, fieldName) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    useEffect(() => {
        onDataChange({ [step]: formData });
    }, [formData, step]); // 监听 formData 和 step 的变化

    return (
        <>
            <div className="p-col-3">
                <InputText value={formData.input1} onChange={(e) => handleInputChange(e, 'input1')} />
            </div>
            <div className="p-col-3">
                <InputText value={formData.input2} onChange={(e) => handleInputChange(e, 'input2')} />
            </div>
            {/* 添加其他的 input */}
            {/* <div className="p-col-3">
                <InputText value={formData.input3} onChange={(e) => handleInputChange(e, 'input3')} />
            </div> */}
        </>
    );
}

export default StepChild;


// 子组件 StepChild.js
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

const StepChild = ({ onDataChange }) => {
    const [formData, setFormData] = useState({
        input1: '',
        input2: '',
        // 这里添加其他的 input 数据
        input10: ''
    });

    const handleInputChange = (e, fieldName) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    // 当任何一个输入框的值发生改变时调用此函数，将所有输入数据传递给父组件
    const handleFormChange = () => {
        onDataChange(formData);
    };

    return (
        <div className="p-grid p-fluid">
            <div className="p-col-3">
                <InputText value={formData.input1} onChange={(e) => handleInputChange(e, 'input1')} onBlur={handleFormChange} />
            </div>
            <div className="p-col-3">
                <InputText value={formData.input2} onChange={(e) => handleInputChange(e, 'input2')} onBlur={handleFormChange} />
            </div>
            {/* 添加其他的 input */}
            {/* <div className="p-col-3">
                <InputText value={formData.input3} onChange={(e) => handleInputChange(e, 'input3')} onBlur={handleFormChange} />
            </div> */}
        </div>
    );
}

export default StepChild;

