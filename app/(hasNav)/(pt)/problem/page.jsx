import { redirect } from 'next/navigation'
 
export default function ProblemIndex({ params }) {
  redirect("/problem/list")
}