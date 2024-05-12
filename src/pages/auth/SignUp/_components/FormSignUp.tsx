import InputForm from "../../_components/InputForm"

type Props = {}

const FormSignUp = () => {
    return (
        <>
            <form className="account-form">
                <div className="form-group">
                    <InputForm name={"email"} typeInput="email" />
                </div>

                <div className="form-group row">
                    <div className="col-sm-12 col-md-6 my-2">
                        <InputForm name={"Full name"} typeInput="text" />
                    </div>
                    <div className="col-sm-12 col-md-6 my-2">
                        <InputForm name={"Phone"} typeInput="text" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-12 col-md-6 my-2">
                        <label htmlFor="birth">
                            Birthday<span>*</span>
                        </label>
                        <input
                            type="date"
                            id="birth"
                            required
                        />
                    </div>
                    <div className="col-sm-12 col-md-6 my-2">
                        <label htmlFor="gender">
                            Gender<span>*</span>
                        </label>
                        <select className="border-0" style={{ backgroundColor: "#001232" }} name="gender" id="">
                            <option defaultValue={""}>Chọn giới tính</option>
                            <option value={"Nam"}>Nam</option>
                            <option value={"Nữ"}>Nữ</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <InputForm name={"Password"} typeInput="password" />
                </div>
                <div className="form-group">
                    <InputForm name={"Confirm password"} typeInput="password" />
                </div>
                <div className="form-group checkgroup">
                    <input type="checkbox" id="bal" required defaultChecked={false} />
                    <label htmlFor="bal">
                        I agree to the <a href="#0">Terms, Privacy Policy</a> and{" "}
                        <a href="#0">Fees</a>
                    </label>
                </div>
                <div className="form-group text-center">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </>
    )
}

export default FormSignUp