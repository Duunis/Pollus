import CodeEditor from '@uiw/react-textarea-code-editor'
import React from 'react'
import styled from 'styled-components'

const supportedLanguages = [
  'c',
  'cpp',
  'csharp',
  'css',
  'go',
  'java',
  'javascript',
  'json',
  'kotlin',
  'less',
  'lua',
  'markdown',
  'makefile',
  'objectivec',
  'php',
  'python',
  'regex',
  'rust',
  'sql',
  'swift',
  'typescript',
  'yaml'
]

const CodeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Code: React.FC = () => {
  const [selectedLanguage, setSelectedLangauge] = React.useState<string>('javascript')

  return (
    <CodeContainer>
      <select>
        {supportedLanguages.map((language) => (
          <option value={language}>{language}</option>
        ))}
      </select>
      <CodeEditor
        value={''}
        language={'javascript'}
        onChange={(value) => console.log(value)}
        placeholder='Type your code here'
        padding={15}
        style={{
          width: '100%',
          marginTop: '1em',
          borderRadius: '8px',
          maxHeight: '50%',
          fontFamily: 'monospace',
          backgroundColor: '#ccc',
        }}
      />
    </CodeContainer>
  )
}

export default Code

