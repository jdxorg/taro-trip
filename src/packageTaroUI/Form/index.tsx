import Taro, {useState} from '@tarojs/taro'
import { 
  AtForm,
  AtInput,
  AtInputNumber,
  AtRadio,
  AtCheckbox,
  AtRate,
  AtTextarea,
  AtCalendar     } from 'taro-ui'

const Form: Taro.FC<any> = props => {
  
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')
  const [count, setCount] = useState(0)
  const [radio, setRadio] = useState()
  const [checkedList, setCheckedList] = useState(['list1'])
  const [rate, setRate] = useState(2)
  const [txt, setTxt] = useState('')
  return (
    <AtForm>
      <AtInput
        clear
        name='name'
        border={false}
        title='清除按钮'
        placeholder='点击清除按钮清空内容'
        type='text'
        value={username}
        onChange={(value: string) => setUserName(value)}
      />
      <AtInput
        clear
        name='password'
        border={false}
        title='清除按钮'
        placeholder='点击清除按钮清空内容'
        type='password'
        value={password}
        onChange={(value: string) => setPassWord(value)}
      />
      <AtInputNumber
        type='digit'
        min={0}
        max={10}
        step={1}
        value={count}
        onChange={(value: number) => setCount(value)}
      />
      <AtRadio
        options={[
          { label: '单选项一', value: 'option1', desc: '单选项描述' },
          { label: '单选项二', value: 'option2' },
          { label: '单选项三禁用', value: 'option3', desc: '单选项描述', disabled: true }
        ]}
        value={radio}
        onClick={(value: string) => {
          console.log(`AtRadio->${value}`)
          setRadio(value)
        }}
      />
      <AtCheckbox
        options={[{
          value: 'list1',
          label: 'iPhone X',
          desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
        }, {
          value: 'list2',
          label: 'HUAWEI P20'
        }, {
          value: 'list3',
          label: 'OPPO Find X',
          desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
          disabled: true
        }, {
          value: 'list4',
          label: 'vivo NEX',
          desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
          disabled: true
        }]}
        selectedList={checkedList}
        onChange={(value: any[]) => {
          console.log(`AtCheckbox->${value}`)
          setCheckedList(value)
        }}
      />
      <AtRate
        value={rate}
        onChange={(value: any) => {
          console.log(`AtRate->${value}`)
          setRate(value)
        }}
        customStyle={{margin: '30px 0'}}
      />
      <AtTextarea
        value={txt}
        onChange={(event: any) => {
          setTxt(event.target.value)
        }}
        maxLength={200}
        placeholder='你的问题是...'
      />

      <AtCalendar 
        // isMultiSelect 
        // currentDate={
        //   {
        //     start: '2018/10/28', 
        //     end: '2018/11/11'
        //   }
        // }
        marks={[{ value: '2018/11/11' }]}
      />
    </AtForm>
  )
}

export default Form

