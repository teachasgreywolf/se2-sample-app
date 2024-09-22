import { Label } from "@/shadcn/ui/label";
import React from "react";

const LabelEx = ({ className, required, ...props }) => {
    return (
        <>
            <Label className={className} {...props} />
            {/* prettier-ignore */}
            <span className="text-red-600 ml-1" hidden={!required}>*</span>
        </>
    );
};

export default LabelEx;
