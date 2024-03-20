import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

const ValidatedInputText = ({ id, value, onChange, required, pattern, formatErrorMessage }) => {
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { value } = e.target;
        onChange(value);

        // 必填验证
        if (required && !value.trim()) {
            setError('此项为必填');
        } else if (pattern && !new RegExp(pattern).test(value)) {
            setError(formatErrorMessage || '输入格式不正确');
        } else {
            setError('');
        }
    };

    return (
        <div>
            <InputText id={id} value={value} onChange={handleInputChange} />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default ValidatedInputText;


<ValidatedInputText
    id="input1"
    value={formData.input1}
    onChange={(value) => handleInputChange(value, 'input1')}
    required // 设置为必填项
    pattern="^ISSUE-\d{3}$" // 只允许遵循 ISSUE-000 格式
    formatErrorMessage="格式必须为 ISSUE-000" // 自定义格式错误消息
/>


pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
pattern="^\d{4}-\d{2}-\d{2}$"
pattern="^[a-zA-Z]+$"
pattern="^[0-9]+$"


Email 地址验证：

javascript
Copy code
pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
日期格式验证 (YYYY-MM-DD)：

javascript
Copy code
pattern="^\d{4}-\d{2}-\d{2}$"
全是字母的验证：

javascript
Copy code
pattern="^[a-zA-Z]+$"
全是数字的验证：

javascript
Copy code
pattern="^[0-9]+$"


pattern="^AUD-\d{5}$"