import { Text, Box } from "@chakra-ui/react";

function parseErrorCode(code) {
    if (code === 'VALIDATION_FAILED') return 'Validation failed';
    if (code === 'UNAUTHORIZED') return 'Not authorized';
    if (code === 'FORBIDDEN') return 'No permission';
  
    return 'Unknown error';
  }
  
function parseError(error) {
    let title, message;
  
    if (typeof error === 'object' && error.response?.data) {
        title = parseErrorCode(error.response.data.code);
        message = error.response.data.message;
  
        if (typeof message === 'object') {
            message = message.message;
        }
    }
  
    return {
        title: title || 'Unknown error',
        message: message || 'Er is iets misgegaan, probeer later opnieuw.',
    };
}
  
export default function ErrorMessage({ error }) {
    if (!error) return null;
  
    const { title, message } = parseError(error);
  
    return (
        <>
            <Text data-cy="error_message">
                {title}<br />
                {message}
            </Text>
        </>
    );
}