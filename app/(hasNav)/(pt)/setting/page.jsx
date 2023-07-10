import { redirect } from 'next/navigation'
 
export default function Profile({ params }) {
  redirect("/setting/profile")
}