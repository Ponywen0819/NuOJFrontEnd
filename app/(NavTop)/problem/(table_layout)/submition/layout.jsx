import { RequireAuth } from '@/contexts/auth';

export const metadata = {
    title: "繳交狀態"
};


const ProblemSubmitionLayout = ({ children }) => {
    return(
        <RequireAuth>
            {children}
        </RequireAuth>
    )
}

export default ProblemSubmitionLayout;