import {useState} from "react";
import {AiOutlineDelete} from "react-icons/ai";
import {CgEye} from "react-icons/cg";
import 'react-photo-view/dist/react-photo-view.css';
import {PhotoProvider, PhotoView} from 'react-photo-view';

type UploaderProps = {
    action: "CREATE" | "EDIT";
    files: File[];
    setFiles: (files: File[]) => void;
    items?: {
        id: string;
        url: string;
    }[];
    setDeletedItems?: (id: string) => void;
    deletedItems?: string[];
    type: "SINGLE" | "MULTIPLE";
};

const MultiUploader = ({
                           action,
                           files = [],
                           items = [],
                           setDeletedItems,
                           type,
                           setFiles,
                           deletedItems
                       }: UploaderProps) => {
    const [hasItems, setHasItems] = useState<{ id?: string, url?: string }[]>(items);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const uploadedFiles = Array.from(event.target.files);
            if (type === "SINGLE") {
                setFiles(uploadedFiles.slice(0, 1)); // Only keep the first file for SINGLE mode
            } else {
                setFiles([...files, ...uploadedFiles]);
            }
        }
    };

    return (
        <div className="grid grid-cols-5 gap-5">
            <div
                className="flex justify-center items-center bg-white rounded-md border-2 border-dashed border-black/20 size-32 cursor-pointer relative">
                <div className="text-center">
                    <span>Yuklash</span>
                </div>
                <input
                    type="file"
                    multiple={type === "MULTIPLE"} // Allow multiple selection only if type is MULTIPLE
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                />
            </div>

            <PhotoProvider>
                {action === "EDIT" && hasItems.filter((item) => !deletedItems?.includes(item.id!)).map((item) => (
                    <div
                        key={item.id}
                        style={{backgroundImage: `url(${item.url})`}}
                        className="size-32 rounded-md bg-cover bg-center relative flex justify-center items-center group"
                    >
                        <div
                            className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md"></div>

                        <div className="hidden group-hover:flex gap-2 z-10">
                            <PhotoView src={item.url}>
                                <CgEye className="text-white text-[19px] cursor-pointer"/>
                            </PhotoView>

                            <AiOutlineDelete
                                className="text-white text-xl cursor-pointer"
                                onClick={() => {
                                    setHasItems(hasItems.filter((hasItem) => hasItem.id !== item.id));
                                    setDeletedItems?.(item.id!);
                                }}
                            />
                        </div>
                    </div>
                ))}

                {files.map((file, index) => (
                    <div
                        key={index}
                        style={{backgroundImage: `url(${URL.createObjectURL(file)})`}}
                        className="size-32 rounded-md bg-cover bg-center relative flex justify-center items-center group"
                    >
                        <div
                            className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md"></div>
                        <div className="hidden group-hover:flex gap-2 z-10">
                            <PhotoView src={URL.createObjectURL(file)}>
                                <CgEye className="text-white text-[19px] cursor-pointer"/>
                            </PhotoView>

                            <AiOutlineDelete
                                className="text-white text-xl cursor-pointer"
                                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                            />
                        </div>
                    </div>
                ))}

            </PhotoProvider>
        </div>
    );
};

export default MultiUploader;