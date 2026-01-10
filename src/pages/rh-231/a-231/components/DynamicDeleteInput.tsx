import { Button } from "dgz-ui";
import { MyInput } from "dgz-ui-shared/components/form";
import { Trash2 } from "lucide-react";
import React, { useState, KeyboardEvent } from "react";

interface IdInputProps {
  onIdsChange?: (ids: string[]) => void;
  initialIds?: string[];
}

const DynamicIdInput: React.FC<IdInputProps> = ({
  onIdsChange,
  initialIds = [],
}) => {
  const [inputValues, setInputValues] = useState<string[]>(
    initialIds.length > 0 ? initialIds : [""],
  );
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        index === inputValues.length - 1 &&
        inputValues[index].trim() !== ""
      ) {
        setInputValues([...inputValues, ""]);
      }
    }
  };

  const handleChange = (index: number, value: string) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);

    const filledIds = newValues.filter((val) => val.trim() !== "");

    if (onIdsChange) {
      onIdsChange(filledIds);
    }
  };

  const removeId = (index: number) => {
    const newValues = inputValues.filter((_, i) => i !== index);
    setInputValues(newValues);

    const filledIds = newValues.filter((val) => val.trim() !== "");

    if (onIdsChange) {
      onIdsChange(filledIds);
    }

    if (newValues.length === 0) {
      setInputValues([""]);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold">O'chirish to'g'risida</h2>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        ID lar (Enter bosib yangi qator qo'shing)
      </label>
      <div className="flex gap-4 items-center">
        {inputValues.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <MyInput
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              placeholder="Masalan: ID-6620"
              autoFocus={index === inputValues.length - 1 && value === ""}
            />
            {inputValues.length > 1 || value.trim() !== "" ? (
              <Button
                type="button"
                onClick={() => removeId(index)}
                className="bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1"
              >
                <Trash2 />
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicIdInput;
