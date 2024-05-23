import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
} from "@internationalized/date";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { List } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useRef, useState } from "react";

const AddUserForm = ({
  user,
  values,
  errors,
  touched,
  isSubmit,
  handleSubmit,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const [dateErr, setDateErr] = useState({ status: false, message: "" });
  const skillInputRef = useRef();
  const certInputRef = useRef();

  const handleAddInputListItem = (values, fieldName, value) => {
    if (value == "") {
      return;
    }

    let newList = [...values];
    newList.push(value);
    setFieldValue(fieldName, newList);
  };

  // Remove a skill/cert item from the list when remove button is clicked
  const handleRemoveInputListItem = (values, fieldName, index) => {
    let newList = [...values];

    newList.splice(index, 1);

    setFieldValue(fieldName, newList);
  };

  return (
    <div className="user-form">
      {isSubmit ? null : <p className="user-id">
        ID: {user.id}
      </p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        {/* Left column */}

        <Input
          value={values.name}
          type="text"
          id="name"
          label="Full Name"
          variant="bordered"
          radius="sm"
          isInvalid={errors.name && touched.name ? true : false}
          color={errors.name && touched.name ? "danger" : "default"}
          errorMessage={errors.name}
          onValueChange={handleChange}
          onChange={handleChange}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.name}
        />

        <Input
          value={values.phone}
          type="text"
          id="phone"
          label="Phone Number"
          variant="bordered"
          radius="sm"
          isInvalid={errors.phone && touched.phone ? true : false}
          color={errors.phone && touched.phone ? "danger" : "default"}
          errorMessage={errors.phone}
          onValueChange={handleChange}
          onChange={handleChange}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.phone}
        />

        <DatePicker
          label="Birthday"
          id="birthday"
          variant="bordered"
          radius="sm"
          
          isInvalid={dateErr.status}
          color={errors.birthday ? "danger" : "default"}
          errorMessage={dateErr.message}
          onChange={(value) => {
            let now = today(getLocalTimeZone());
            if (!value) {
              setDateErr({ status: true, message: "Field is required." });
            } else if (value > now) {
              setDateErr({
                status: true,
                message: "Cannot select date from the future.",
              });
            } else {
              setDateErr({ status: false, message: "" });
            }
            console.log(dateErr);
            setFieldValue("birthday", value);
          }}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.birthday}
        />

        <Select
          label="Gender"
          variant="bordered"
          radius="sm"
          //   className="max-w-xs"
          onBlur={handleBlur}
          defaultSelectedKeys={isSubmit ? null : [values.gender]}
          onChange={(e) => {
            setFieldValue("gender", e.target.value);
          }}
        >
          <SelectItem key={true} value={true}>
            Male
          </SelectItem>

          <SelectItem key={false} value={false}>
            Female
          </SelectItem>
        </Select>

        <Select
          label="Role"
          variant="bordered"
          radius="sm"
          //   className="max-w-xs"
          onBlur={handleBlur}
          defaultSelectedKeys={isSubmit ? null : [values.role]}
          onChange={(e) => {
            setFieldValue("role", e.target.value);
          }}
        >
          <SelectItem key="USER" value="USER">
            USER
          </SelectItem>

          <SelectItem key="ADMIN" value="ADMIN">
            ADMIN
          </SelectItem>
        </Select>

        {/* Right column */}

        <Input
          value={values.email}
          type="text"
          id="email"
          label="Email"
          variant="bordered"
          radius="sm"
          isInvalid={errors.email && touched.email ? true : false}
          color={errors.email && touched.email ? "danger" : "default"}
          errorMessage={errors.email}
          onValueChange={handleChange}
          onChange={handleChange}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.email}
        />

        <Input
          value={values.password}
          type="password"
          id="password"
          label="Password"
          variant={isSubmit ? "bordered" : "faded"}
          radius="sm"
          isDisabled={isSubmit ? false : true}
          isInvalid={errors.password && touched.password ? true : false}
          color={errors.password && touched.password ? "danger" : "default"}
          errorMessage={errors.password}
          onValueChange={handleChange}
          onChange={handleChange}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.password}
        />

        <div className="dashboard-skill-input-wrapper">
          <Input
            type="text"
            id="skill"
            label="Skills"
            variant="bordered"
            radius="sm"
            color="default"
            //   onValueChange={handleChange}
            //   onChange={handleChange}
            //   className="max-w-xs"
            //   onBlur={handleBlur}
            //   touched={touched.phone}
            ref={skillInputRef}
            endContent={
              <Button
                className="form-add-btn"
                onClick={() => {
                  handleAddInputListItem(
                    values.skill,
                    "skill",
                    skillInputRef.current.value
                  );
                }}
              >
                Add
              </Button>
            }
          />

          <div className="dashboard-skill-input w-full">
            {values.skill.length == 0 ? null : (
              <div className="dashboard-skill-input-list">
                <List
                  dataSource={values.skill}
                  renderItem={(item, index) => (
                    <div className="dashboard-list-item px-4 py-2">
                      <div className="flex justify-between items-center">
                        <p>{item}</p>
                        <i
                          className="fa-solid fa-trash dashboard-remove-btn text-red-500 hover:text-red-600"
                          onClick={() => {
                            handleRemoveInputListItem(
                              values.skill,
                              "skill",
                              index
                            );
                          }}
                        ></i>
                      </div>
                    </div>
                  )}
                />
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-skill-input-wrapper">
          <Input
            type="text"
            id="cert"
            label="Certification"
            variant="bordered"
            radius="sm"
            color="default"
            //   onValueChange={handleChange}
            //   onChange={handleChange}
            //   className="max-w-xs"
            //   onBlur={handleBlur}
            //   touched={touched.phone}
            ref={certInputRef}
            endContent={
              <Button
                className="form-add-btn"
                onClick={() => {
                  handleAddInputListItem(
                    values.certification,
                    "certification",
                    certInputRef.current.value
                  );
                }}
              >
                Add
              </Button>
            }
          />

          <div className="dashboard-skill-input w-full">
            {values.certification.length == 0 ? null : (
              <div className="dashboard-skill-input-list">
                <List
                  dataSource={values.certification}
                  renderItem={(item, index) => (
                    <div className="dashboard-list-item px-4 py-2">
                      <div className="flex justify-between items-center">
                        <p>{item}</p>
                        <i
                          className="fa-solid fa-trash dashboard-remove-btn text-red-500 hover:text-red-600"
                          onClick={() => {
                            handleRemoveInputListItem(
                              values.certification,
                              "certification",
                              index
                            );
                          }}
                        ></i>
                      </div>
                    </div>
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
