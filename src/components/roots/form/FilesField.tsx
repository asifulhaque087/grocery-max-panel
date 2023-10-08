'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useIsBrowser } from '@src/hooks';
import { convertToBase64 } from '@src/utils/convertToBase64';
import { isHttpUrl } from '@src/utils';
// import { Iproduct_image_galleries } from '@src/types/models';

type FilesFieldProps = {
  formGroupClasses?: string;
  customReactSelectProps?: {};
  required?: any;
  control: any;
  controller: any;
  label: string;
  fieldName: string;
  isMulti?: boolean;
  value?: any;
  validationErrorMessage?: string;
  removeImageFromServer?: () => Promise<boolean>;
};
export const FilesField = (props: FilesFieldProps) => {
  // const isBrowser = useIsBrowser();

  // store

  const Controller = props.controller;

  return (
    <div className={`multiple-select-field ${props.formGroupClasses}`}>
      <Controller
        control={props.control}
        name={props.fieldName}
        render={({ field: { value, onChange, ...field } }: any) => {
          const [selectedPhotos, setSelectedPhotos] = useState<string[]>();

          const getPreviewImages = async (value: any) => {
            let unProcessedFiles = value;
            let processedFiles = unProcessedFiles?.length
              ? await convertToBase64(unProcessedFiles)
              : [];
            // setSelectedPhotos(processedFiles);
            return processedFiles;
          };

          const removeImg = async (photo: string, i: number) => {
            const isHttp = isHttpUrl(photo);
            let isLocal = true;

            if (isHttp) {
              isLocal = false;
              if (props.removeImageFromServer) {
                const deleted = await props.removeImageFromServer();
                if (deleted) isLocal = true;
              }
            }

            // local Rmove
            if (!isLocal) return;

            const newValues = value.filter(
              (itm: string, index: number) => index !== i
            );
            onChange(newValues);
          };

          return (
            <>
              <label
                htmlFor={props.label}
                className="text-[13px] text-[#292D32] capitalize block mb-[5px]"
              >
                {props.label}
              </label>
              <input
                {...field}
                value={value?.fileName}
                onChange={async (event) => {
                  const new_files = await getPreviewImages(event.target.files);
                  const update_files = new_files.map((img) => img.url);
                  props.isMulti
                    ? onChange([...value, ...update_files])
                    : onChange(update_files);
                  //   onChange(event.target.files);
                  // event.target.value = '';
                  // console.log('event ', event.target.value);
                }}
                type="file"
                multiple={props.isMulti}
                id={props.label}
              />

              {value.length ? (
                <div>
                  <div className="flex items-center justify-center gap-x-[10px] gap-y-[20px] flex-wrap mt-[30px]">
                    {value &&
                      value?.map((photo: any, i: number) => (
                        <div key={i} className="relative h-[200px] w-[200px]">
                          {/* remove button */}
                          <span
                            className="absolute bottom-[100%] left-[100%] -translate-x-[10px] translate-y-[10px] w-[15px] h-[15px] rounded-full text-[8px] bg-white border border-red-500 text-red-500 grid place-items-center cursor-pointer"
                            onClick={() => {
                              // const isHttp = isHttpUrl(photo);
                              // if (!isHttp) {
                              // onChange([]);
                              removeImg(photo, i);
                              // }
                            }}
                          >
                            x
                          </span>
                          {/* image-box */}
                          <div className="w-full h-full rounded-[6px] border overflow-hidden">
                            <img
                              className="h-full w-full object-cover object-center mx-auto"
                              src={photo}
                              alt="product"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : null}
            </>
          );
        }}
      />
    </div>
  );
};
