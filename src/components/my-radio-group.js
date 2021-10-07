import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '@headlessui/react';

const MyRadioGroup = ({ selected = "", setSelected = () => null, options = [] }) => {
  return (
    <div className="w-full">
      <div className="w-full max-w-md mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {options.map(option => (
              <RadioGroup.Option
                key={option}
                value={option}
                className={({ active, checked }) =>
                  `${active
                    ? 'ring-2 ring-offset-2 ring-offset-indigo-300 ring-indigo-800 ring-opacity-60'
                    : ''
                  }
                  ${checked ? 'bg-indigo-900 bg-opacity-75 text-indigo-900' : 'bg-white'
                  }
                    relative rounded-lg shadow-md px-3 py-2 cursor-pointer flex focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${checked ? 'text-indigo-100' : 'text-gray-900'
                              }`}
                          >
                            {option}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${checked ? 'text-indigo-200' : 'text-gray-500'
                              }`}
                          >
                            No description
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-indigo-200">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
};

MyRadioGroup.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default MyRadioGroup;
