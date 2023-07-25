import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IProductInformation } from '@src/types/compounds';

export const ProductInformation = ({ setActiveIndex }: IProductInformation) => {
  return (
    <div className="flex flex-col sm:flex-row items-start justify-center gap-[20px] my-[20px]  bg-[rgb(248,247,250)]">
      {/* top */}
      <div className="w-full rounded-[10px] bg-white shadow-custom">
        <h4 className="text-[16px] font-[500] text-[#24334A] capitalize py-[12px] px-[25px] border-b">
          product informations
        </h4>

        <div className="p-[24px]">
          {/* name */}
          <div className="flex flex-col gap-y-[5px]">
            <label
              htmlFor="name"
              className="text-[13px] text-[#292D32] capitalize"
            >
              product Name
            </label>
            <input
              id="name"
              type="text"
              // placeholder="search invoice"
              className="w-full outline-none text-[rgba(47,43,61,0.68)] placeholder:text-[rgba(47,43,61,0.48)] placeholder:capitalize border rounded-[6px] px-[16px] py-[8px] focus:shadow-[0px_2px_4px_rgba(47,43,61,.12)] focus:border-[#7367f0] focus:placeholder:pl-[10px] focus:transition-all focus:placeholder:transition-all placeholder:transition-all transition-all"
            />
          </div>

          {/* description */}

          <div className="mt-[15px] flex flex-col gap-y-[5px]">
            <label
              htmlFor="description"
              className="text-[13px] text-[#292D32] capitalize"
            >
              product Description
            </label>
            <div>
              <CKEditor
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
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            </div>
          </div>

          <button
            className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[15px]"
            onClick={() => setActiveIndex(1)}
          >
            <span className="text-[15px] font-[500] text-white capitalize">
              Next
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
