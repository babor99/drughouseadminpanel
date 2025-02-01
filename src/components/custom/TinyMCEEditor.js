import { useRef } from 'react';

import { Editor } from '@tinymce/tinymce-react'

import { TINY_MCE_API_KEY } from '@/constants/constants'

function CustomTinyMCEEditor({ value, setValue, id }) {

    const editorRef = useRef(null);

    const onTinyMCEChange = () => {
        if (editorRef.current) {
            setValue(editorRef.current.getContent());
        }
    };

    return (
        <Editor
            id={id}
            value={value}
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey={TINY_MCE_API_KEY}
            onEditorChange={onTinyMCEChange}
            placeholder="Enter your text here.."
            init={{
                height: 200,
                placeholder: 'Enter your text here..',
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                branding: false
            }}
        />
    )
}

export default CustomTinyMCEEditor;
