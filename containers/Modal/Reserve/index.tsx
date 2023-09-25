'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Modal } from 'containers'
import { useEffect, type FC } from 'react'

export interface Props extends ModalProps {
  onComplete: () => void
  id: number
}

const ReserveModal: FC<Props> = ({ isOpen, onClose, onComplete, id }) => {
  const supabase = createClientComponentClient<Database>()

  const get = async () => {
    const { data } = await supabase
      .from('reserves')
      .select('*')
      .eq('id', id)
      .single()
  }

  const update = async () => {}

  useEffect(() => {
    if (id) get()
  }, [id])
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="수정" maxWidth="max-w-3xl">
      asd
    </Modal>
  )
}

export default ReserveModal
