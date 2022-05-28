import React from "react";

export const FilesViewer = ({files, onBack, onOpen}) => (
        <table className="table">
            <tbody>
            <tr onClick={onBack}>
                <td>
                   {/* <IconFolderOpen/>*/}
                </td>
                <td>...</td>
                <td></td>
            </tr>
            {
                files.map(({name, directory, size}) => {
                    return (
                        <tr>
                            <td onClick={() => directory && onOpen(name)}>
                                {directory ? "<!--<IconFolder/>-->" : {/*<IconFile/>*/}}
                            </td>
                            <td>{name}</td>
                            <td><span>{size}</span></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )

