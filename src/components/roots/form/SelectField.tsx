'use client';

import React, { useEffect, useRef } from 'react';
// import './style/multiSelectField.style.scss';
import Select from 'react-select';
import { CustomSelectValueContainer } from './CustomSelectValueContainer';
import { useIsBrowser } from '@src/hooks';

export type SelectOptionType = {
  value: string | number;
  label: string | number;
};
type IProps = {
  key?: string;
  formGroupClasses?: string;
  customReactSelectProps?: {};
  required?: any;
  control: any;
  controller: any;
  selectLabel: string;
  defaultValue?: SelectOptionType[];
  selectName: string;
  selectOptions: SelectOptionType[];
  // value?: SelectOptionType[];
  isMulti?: boolean;
  value?: any;
  validationErrorMessage?: string;
};
export const SelectField = (props: IProps) => {
  const isBrowser = useIsBrowser();

  const Controller = props.controller;

  if (!isBrowser) return null;

  return (
    <div className={`multiple-select-field ${props.formGroupClasses}`}>
      <Controller
        control={props.control}
        defaultValue={props.defaultValue}
        name={props.selectName}
        render={({ field: { onChange, value, name, ref }, formState }: any) => {
          // console.log('value is ', value);
          // const selectInputRef = useRef();

          // console.log(
          //   'the condition is ',
          //   props.selectOptions.map((c) => {
          //     const exits = value?.map((val: any) => val === c.value);

          //     if (exits) {
          //       return c;
          //     }
          //   })
          // );

          // useEffect(() => {
          //   console.log('hello');
          //   if (value === '') {
          //     console.log('ref is ', ref);
          //     ref.current.select.clearValue();
          //   }
          // }, [value]);

          return (
            <>
              <Select
                defaultValue={props.defaultValue}
                hideSelectedOptions={false}
                // isMulti
                isMulti={props.isMulti}
                ref={ref}
                value={
                  !value
                    ? null
                    : props.selectOptions.find((o) => {
                        console.log(value);
                        return o.value === value;
                      })
                }
                name={name}
                {...props.customReactSelectProps}
                components={{ ValueContainer: CustomSelectValueContainer }}
                placeholder={props.selectLabel}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    borderColor: formState?.errors?.[name]
                      ? '#dc3545'
                      : styles.borderColor,
                    boxShadow: formState?.errors?.[name]
                      ? '#dc3545'
                      : styles.boxShadow,
                  }),
                  container: (provided, state) => ({
                    ...provided,
                    marginTop: 10,
                  }),
                  valueContainer: (provided, state) => ({
                    ...provided,
                    overflow: 'visible',
                    marginTop: 10,
                    height: 50,
                  }),
                  placeholder: (provided, state) => ({
                    ...provided,
                    position: 'absolute',
                    marginTop: -10,
                    top: '0%',
                    transition: 'top 0.1s, font-size 0.1s',
                    fontSize:
                      (state.hasValue || state.selectProps.inputValue) && 13,
                  }),
                }}
                options={props.selectOptions}
                onChange={(e: any) => {

                  const increased = e?.length > (value?.length ?? 0);
                  // const increased = e?.length > valueLength;

                  if (!increased && props.isMulti) {
                    let res;
                    for (let i = 0; i < value.length; i++) {
                      res =
                        typeof value[i] === 'object' && value[i] !== null
                          ? value[i].value
                          : value[i];

                      for (let j = 0; j < e.length; j++) {
                        if (e[j].value !== res) {
                          break;
                        }
                      }
                    }

                    // console.log(window.confirm('Press a button!'));

                    // console.log('removed ', res);
                  }

                  return e.value
                    ? onChange(e.value)
                    : onChange(e.map((c: any) => c.value));
                }}
              />
              {/* <Form.Control.Feedback
              type="invalid"
              className={formState?.errors && 'show-error'}
            >
              {props.validationErrorMessage}
            </Form.Control.Feedback> */}
            </>
          );
        }}
      />
    </div>
  );
};
