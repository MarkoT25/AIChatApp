export const validateSignUp = (formData: FormData): string | undefined => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!username || !email || !password || !confirmPassword) {
        return "Please fill in all fields";
    }
    if (password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    if (password !== confirmPassword) {
        return "Passwords do not match";
    }

    return;
}