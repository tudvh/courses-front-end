import { RefreshCcw, Search } from 'lucide-react'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { UserSearchParams } from '@/types/admin'

type FormSearchProps = {
  dataSearch: UserSearchParams
  setDataSearch: Dispatch<SetStateAction<UserSearchParams>>
  onReset: () => void
  onSearch: () => void
}

export default function FormSearch(props: FormSearchProps) {
  const { dataSearch, setDataSearch, onReset, onSearch } = props

  const changeDataSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setDataSearch(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleStatusChange = (value: string) => {
    if (dataSearch.isActive !== value) {
      setDataSearch(prev => ({
        ...prev,
        isActive: value === 'all' ? '' : value,
      }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 text-sm">
        <div>
          <Label>Tìm kiếm</Label>
          <Input
            name="q"
            placeholder="Tìm kiếm..."
            value={dataSearch.q}
            autoComplete="off"
            onChange={changeDataSearch}
          />
        </div>
        <div>
          <Label>Trạng thái</Label>
          <Select value={dataSearch.isActive || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="true">Đang hoạt động</SelectItem>
              <SelectItem value="false">Bị cấm</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button type="button" onClick={onReset}>
          <RefreshCcw size={20} />
          <span>Làm mới</span>
        </Button>
        <Button type="button" onClick={onSearch}>
          <Search size={20} />
          <span>Tìm kiếm</span>
        </Button>
      </div>
    </div>
  )
}
