import { useState, useEffect, useRef } from "react";
import { useWatch, Control } from "react-hook-form";
import { debounce } from "lodash";
import { request } from "@/request";

interface UseFlowValidationProps {
  control: Control<any>;
  updateType: string;
}

interface ValidationStates {
  [key: string]: boolean;
}

export const useFlowValidation = ({
  control,
  updateType,
}: UseFlowValidationProps) => {
  const [validationStates, setValidationStates] = useState<ValidationStates>(
    {},
  );

  const watchedUpdateFlowIds = useWatch({
    control,
    name: "update.flow_ids",
  });

  const watchedOriginalNum = useWatch({
    control,
    name: "original_num",
  });

  // Validation checker function for flow IDs
  const checkValidation = async (
    value: string,
    isEmpty: boolean,
    key: string,
  ) => {
    if (!value || value.trim() === "") {
      setValidationStates((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
      return;
    }

    try {
      const res = await request.get(
        `/api/rh-252/order/check?idOrChannel=${encodeURIComponent(value)}&isEmpty=${isEmpty}`,
      );
      const isValid = res.data?.valid !== false;

      setValidationStates((prev) => ({
        ...prev,
        [key]: isValid,
      }));
    } catch (error) {
      console.error("Validation error:", error);
      setValidationStates((prev) => ({
        ...prev,
        [key]: false,
      }));
    }
  };

  // Validation checker function for original number
  const checkOriginalNum = async (value: string) => {
    if (!value || value.trim() === "") {
      setValidationStates((prev) => {
        const newState = { ...prev };
        delete newState["original_num"];
        return newState;
      });
      return;
    }

    try {
      const res = await request.get(
        `/api/registration-doc/external-inbound/check-original-num?original_num=${encodeURIComponent(value)}`,
      );
      const isValid = res.data?.valid !== false;

      setValidationStates((prev) => ({
        ...prev,
        original_num: isValid,
      }));
    } catch (error) {
      console.error("Original number validation error:", error);
      setValidationStates((prev) => ({
        ...prev,
        original_num: false,
      }));
    }
  };

  // Debounced validation checker for flow IDs
  const debouncedCheck = useRef(
    debounce((value: string, isEmpty: boolean, key: string) => {
      checkValidation(value, isEmpty, key);
    }, 500),
  ).current;

  // Debounced validation checker for original number
  const debouncedCheckOriginalNum = useRef(
    debounce((value: string) => {
      checkOriginalNum(value);
    }, 500),
  ).current;

  // Clear validation states when update type changes
  useEffect(() => {
    setValidationStates({});
  }, [updateType]);

  // Validate flow IDs
  useEffect(() => {
    if (!watchedUpdateFlowIds || watchedUpdateFlowIds.length === 0) return;

    watchedUpdateFlowIds.forEach((item: any, index: number) => {
      if (updateType === "channels") {
        if (item?.id_or_channel) {
          const key = `update-${index}-id_or_channel`;
          debouncedCheck(item.id_or_channel, false, key);
        }
        if (item?.new_id_or_channel) {
          const key = `update-${index}-new_id_or_channel`;
          debouncedCheck(item.new_id_or_channel, true, key);
        }
      } else if (updateType === "flows") {
        if (item?.id_or_channel) {
          const key = `update-${index}-id_or_channel`;
          debouncedCheck(item.id_or_channel, false, key);
        }
      }
    });
  }, [watchedUpdateFlowIds, updateType, debouncedCheck]);

  // Validate original number
  useEffect(() => {
    if (watchedOriginalNum) {
      debouncedCheckOriginalNum(watchedOriginalNum);
    }
  }, [watchedOriginalNum, debouncedCheckOriginalNum]);

  const getValidationClass = (index: number, field: string): string => {
    const key = `update-${index}-${field}`;
    return validationStates[key] === false ? "bg-red-100 border-red-300" : "";
  };

  const getOriginalNumValidationClass = (): string => {
    return validationStates["original_num"] === false
      ? "bg-red-100 border-red-300"
      : "";
  };

  const isFieldInvalid = (index: number, field: string): boolean => {
    const key = `update-${index}-${field}`;
    return validationStates[key] === false;
  };

  const isOriginalNumInvalid = (): boolean => {
    return validationStates["original_num"] === false;
  };

  return {
    validationStates,
    getValidationClass,
    getOriginalNumValidationClass,
    isFieldInvalid,
    isOriginalNumInvalid,
    clearValidation: () => setValidationStates({}),
  };
};
