
export default function FormField({labelName,placeholder,inputType,isTextArea,value,handleChange,isSelectType, selectArray}) {
    return (
        <label className="flex-1 w-full flex flex-col">
            {labelName && (
                <span className="font-epilogue font-medium text-[14px]
             leading-[22px] text-[#808191] mb-[10px]"
                >
                    {labelName}
                </span>
            )}
            {isTextArea ? (
                <textarea
                    required
                    value={value}
                    onChange={handleChange}
                    rows={10}
                    placeholder={placeholder}
                    className="py-[15px] sm:px-[15px] px-[15px]
                outline-none border-[1px] border-[#3a3a43]
                bg-transparent font-epilogue text-white text-[14px]
                placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]
            "
                />
            ) : (
                !isSelectType? <input
                    required
                    value={value}
                    onChange={handleChange}
                    type={inputType}
                    step="0.1"
                    placeholder={placeholder}
                    className="py-[15px] sm:px-[15px] px-[15px]
                    outline-none border-[1px] border-[#3a3a43]
                    bg-transparent font-epilogue text-white text-[14px]
                    placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]
                "
                />:
                <select
                    required
                    onChange={handleChange}
                    className="py-[15px] sm:px-[15px] px-[15px]
                        outline-none border-[1px] border-[#3a3a43]
                        bg-transparent font-epilogue text-white text-[14px]
                        placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]
                    "
                    
                >
                <option >Select type</option>
                {
                    selectArray?.map((item,index)=>(typeof(item)==="object"?<option key={item.categoryId } value={index} >{item.name}</option>:<option key={index} >{item}</option>))
                }
                </select>
            )}
        </label>
    )
}