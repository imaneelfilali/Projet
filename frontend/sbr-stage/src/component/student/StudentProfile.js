import React, {
	useEffect,
	useState,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentPofile = () => {
	const { id } = useParams();

	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
	});

	useEffect(() => {
		loadStudent();
	}, []);

	const loadStudent = async () => {
		const result = await axios.get(
			`http://localhost:9192/students/student/${id}`
		);
		setStudent(result.data);
	};

	return (
		<section
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
								<img
									src="data:image/jpeg;base64,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"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>
								<h5 className="my-3">
									{`${student.firstName} ${student.lastName}`}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									<button
										type="button"
										className="btn btn-outline-primary">
                                        Appel
									</button>
									<button
										type="button"
										className="btn btn-outline-warning ms-1">
										Message
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Nom de la stagiaire
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.firstName}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Prenom de la stagiaire
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.lastName}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Email
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.email}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Department
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.department}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default StudentPofile;