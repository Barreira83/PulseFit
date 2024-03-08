import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { useParams } from "react-router";
import RoutineDeleteTraining from "../RoutineDeleteTraining/RoutineDeleteTraining";
import useFetchHooks from "../../hooks/useFetchHooks";
import "./RoutineList.scss";

const RoutineList = ({ trainingRoutine, renderElement }) => {
  const { id } = useParams();
  const { hookPostPatchFetch } = useFetchHooks();
  const mutation = useMutation(hookPostPatchFetch);

  return (
    <form action="">
      <ul>
        {trainingRoutine.map((training) => {
          return (
            <li className="list-format" key={training.id_training}>
              <div className="routine-training-name">
                <h3 className="routine-h2">{training.name}</h3>
              </div>

              <div className="series-reps">
                <div>
                  <label className="label-number" htmlFor="series">
                    Series
                  </label>
                  <input
                    className="number-imput"
                    type="number"
                    min="0"
                    id="series"
                    value={training.series}
                    onChange={(e) => {
                      const postBody = {
                        idTraining: training.id_training,
                        reps: training.reps,
                        series: e.target.value || 0,
                      };

                      mutation.mutate(
                        {
                          endpoint: `modifyRoutine/${id}`,
                          method: "PATCH",
                          user: postBody,
                        },
                        {
                          onError: (error) => {
                            Swal.fire({
                              icon: "error",
                              title: "Error",
                              text: error,
                            });
                          },

                          onSuccess: () => {
                            renderElement();
                          },
                        },
                      );
                    }}
                  />
                </div>
                <div>
                  <label className="label-number" htmlFor="reps">
                    Reps
                  </label>
                  <input
                    className="number-imput"
                    type="number"
                    min="0"
                    id="reps"
                    value={training.reps}
                    onChange={(e) => {
                      const postBody = {
                        idTraining: training.id_training,
                        reps: e.target.value || 0,
                        series: training.series,
                      };
                      mutation.mutate(
                        {
                          endpoint: `modifyRoutine/${id}`,
                          method: "PATCH",
                          user: postBody,
                        },
                        {
                          onError: (error) => {
                            Swal.fire({
                              icon: "error",
                              title: "Error",
                              text: error,
                            });
                          },

                          onSuccess: () => {
                            renderElement();
                          },
                        },
                      );
                    }}
                  />
                </div>
              </div>
              <RoutineDeleteTraining
                trainingRoutineId={training.id}
                renderElement={renderElement}
              />
            </li>
          );
        })}
      </ul>
    </form>
  );
};

RoutineList.propTypes = {
  trainingRoutine: PropTypes.array,
  renderElement: PropTypes.func,
};
export default RoutineList;
