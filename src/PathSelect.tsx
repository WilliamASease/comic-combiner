import { isNil } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';

type IProps = {
    updateMasterFileList: (files: File[]) => void;
}

export const PathSelect = (props: IProps) => {
    const { updateMasterFileList } = props;
    const [selectedDirectory, setSelectedDirectory] = useState<FileList | null>(null);
    const fileList = useMemo(() => {
        if (!isNil(selectedDirectory)) {
            let out = [];
            for (let i = selectedDirectory.length; i >= 0; i--) {
                let file = selectedDirectory.item(i);
                if (!isNil(file)) {
                    out.push(file);
                }
            }
            updateMasterFileList(out.filter((file) => file.name.endsWith('.cbz') || file.name.endsWith('.cbr') || file.name.endsWith('.rar')))
            return out;
        }
    }, [selectedDirectory, updateMasterFileList])


    const ref = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (ref.current !== null) {
            ref.current.setAttribute("directory", "");
            ref.current.setAttribute("webkitdirectory", "");
        }
    }, [ref]);


    return (
        <>
            <input style={{ marginLeft: 5 }} type="file" ref={ref} onChange={useCallback((e: { target: { files: React.SetStateAction<FileList | null>; }; }) => {
                setSelectedDirectory(e.target.files)
            },[setSelectedDirectory])} />

            <div style={{ flexGrow: 1, marginLeft: 5 }}>
                {fileList?.map((val) => {
                    if (val.name.endsWith(".cbz") || val.name.endsWith('.cbr') || val.name.endsWith(".rar")) {
                        return (<div style={{ color: 'green', fontWeight: "bold" }}>{val.name}</div>)
                    }
                    return <div style={{ color: 'black' }}>{val.name}</div>
                })}
            </div>
        </>
    );
};