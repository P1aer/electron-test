import './App.css';
import {useMemo, useState} from "react";
import {FilesViewer} from "./components/FileViewer";
const fs = window.require('fs');
const pathM = window.require('path')
const {app} = window.require("@electron/remote")

const formatSize = size => {
  let i = Math.floor(Math.log(size) / Math.log(1024))
  return (size/ Math.pow(1024,i).toFixed(2)* 1
      + " " + ["B","kB","MB","GB","TB"][i])
}

function App() {
  const [path,setPath] = useState(app.getAppPath())
    console.log(path)
  const files = useMemo( () =>
      fs.readdirSync(path)
          .map(file => {
            const stats = fs.statSync(pathM.join(path,file))
            return {
              name: file,
              size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
              directory: stats.isDirectory(),
            }
          })
          .sort((a,b) => {
            if(a.directory === b.directory) {
              return a.name.localeCompare(b.name)
            }
            return a.directory ? -1 : 1
          })
 ,[path] )

    const onBack = () => setPath(pathM.dirname(path));
    const onOpen = folder => setPath(pathM.join(path,folder))

    const [searchString, setSearch] = useState("")
    const filtFiles = files.filter(s => s.name.startsWith(searchString))
  return (
    <div className="App">
        <h4>{path}</h4>
        <div>
            <input value={searchString} onChange={event => setSearch(event.target.value)}/>
        </div>
        <FilesViewer files={filtFiles} onBack={onBack} onOpen={onOpen}/>
    </div>
  );
}

export default App;
