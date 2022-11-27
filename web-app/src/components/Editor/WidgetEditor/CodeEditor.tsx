import CodeEditor from '@uiw/react-textarea-code-editor'
import React from 'react'

const Code: React.FC = () => {
  return (
    <CodeEditor
      value={''}
      language={'javascript'}
      onChange={(value) => console.log(value)}
    />
  )
}

