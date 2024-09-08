import React from 'react'
import Markdown from 'react-markdown'
import { Box } from '@mui/joy';
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 代码高亮
//高亮的主题，还有很多别的主题，可以自行选择
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function MarkdownRender({ markdownText, copyText }) {
  
  return (
    <Box>
      <Markdown
        children={markdownText}
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <Box sx={{
                position: "relative"
              }}>
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={{
                    ...dark,
                    position: "absolute"
                  }}
                />
                <ContentCopyIcon sx={{
                  color: "white",
                  width: 18,
                  height: 18,
                  float: "right",
                  position: "absolute",
                  top: "15px",
                  right: "10px"
                }} 
                onClick={() => copyText(String(children).replace(/\n$/, ''))}
                />
              </Box>

            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      ></Markdown>
    </Box>

  )
}
