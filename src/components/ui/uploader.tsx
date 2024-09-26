/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {useRef, useState} from "react";
import {FiEdit} from "react-icons/fi";
import {LuUpload} from "react-icons/lu";

type UploadProps = {
    url?: string;
    name?: string;
    setFile?: (value: File) => void;
    placeholder?: string,
    className?: string
};

const Uploader = ({url, className, setFile, placeholder}: UploadProps) => {
    const [selectedFile, setselectedFile] = useState<File>();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            setselectedFile(event.target.files[0]);
            setFile?.(event.target.files[0]);
        }
    };

    const onChooseFile = (e: any) => {
        e.stopPropagation()
        inputRef.current?.click();
    }

    return url || selectedFile ? (
        <div
            className="flex gap-3 items-center justify-between border border-black border-opacity-10 py-1 pl-1 pr-5 shadow-sm rounded-sm cursor-pointer"
            onClick={onChooseFile}
        >
            <div className="flex gap-2 items-center ml-2">
                {selectedFile ? (
                    <img src={URL.createObjectURL(selectedFile)} alt={"#"} className={`size-20 ${className}`}/>
                ) : (
                    <img
                        src={url}
                        alt={"#"}
                        className={`size-32 ${className}`}
                    />
                )}
            </div>

            <div>
                <FiEdit className="text-[18px] text-amber-700 opacity-60 font-bold"/>
            </div>

            <input
                type="file"
                className="hidden"
                accept=".png,.jpeg,.jpg,.svg,.webp"
                ref={inputRef}
                onChange={handleOnChange}
            />
        </div>
    ) : (
        <div
            className="flex justify-center items-center gap-1 border border-black border-opacity-10 p-[6px] shadow-sm rounded-sm cursor-pointer"
            onClick={onChooseFile}
        >
            <input
                type="file"
                className="hidden"
                ref={inputRef}
                accept=".png,.jpeg,.jpg,.svg,.webp"
                onChange={handleOnChange}
            />

            <LuUpload className="text-[17px]"/>
            <span>{placeholder || "Upload image"}</span>
        </div>
    );
};

export default Uploader;