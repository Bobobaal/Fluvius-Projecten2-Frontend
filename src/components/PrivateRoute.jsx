import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSession } from '../context/AuthContext';

export default function PrivateRoute({ children, ...rest}) {
    const { isAuthed } = useSession();
    const { pathname } = useLocation();

    return (
        <Route {...rest}>
            {
				isAuthed  ? (
					children
				) : (
                    <Redirect from={pathname} to="/login" />
                )
			}
        </Route>
    );
}