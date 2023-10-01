type problemInfoHead = {
  problem_pid: number
  time_limit: number
  memory_limit: number
  title: string
}

type problemInfoContent = {
  description: string
  input_description: string
  output_description: string
  note: string
}

type problemInfoAuth ={
  handle: string
  user_id: string
}

export type problemInfo = {
  head: problemInfoHead
  content: problemInfoContent
  author: problemInfoAuth
}