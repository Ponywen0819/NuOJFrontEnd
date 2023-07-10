import { redirect } from 'next/navigation'
 
export default function SettingIndex({ params }) {
  redirect("/setting/profile")
}