'use client';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface IEditor<T extends string> {
  field: ControllerRenderProps<FieldValues, T>;
}

export const Editor = <T extends string>({ field }: IEditor<T>) => {
  // useEffect(() => {
  //   // register('input')
  // });

  return (
    <div>
      <CKEditor
        data={field.value}
        onChange={(event, editor) => {
          const data = editor.getData();
          field.onChange(data);
        }}
        // {...field}
        // onChange={(value) => setValue('input', value)}
        editor={ClassicEditor}
        // data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log('Editor is ready to use!', editor);

          editor.editing.view.change((writer) => {
            writer.setStyle(
              //use max-height(for scroll) or min-height(static)
              'min-height',
              '180px',
              editor.editing.view.document.getRoot()!
            );
          });
        }}
        // onChange={(event, editor) => {
        //   const data = editor.getData();
        //   console.log({ event, editor, data });
        // }}
        // onBlur={(event, editor) => {
        //   console.log('Blur.', editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log('Focus.', editor);
        // }}
      />
    </div>
  );
};
