import { Avatar, Dialog, Text } from "@radix-ui/themes";
import { useMemo, useState } from "react";

import { Button, Input, Select } from "@/components";

import styles from "./UserForm.module.css";
import { Role } from "@/types/common";
import { UserFormProps } from "./UserForm.d";

const UserForm = ({
  control,
  setValue,
  formState,
  inputFileRef,
  handleSubmit,
}: UserFormProps) => {
  const [previewImage, setPreviewImage] = useState(
    formState?.defaultValues?.image || ""
  );

  const roleList = useMemo(
    () =>
      Object.entries(Role).map(([key, value]) => ({
        label: key,
        value,
      })),
    []
  );

  const onClickUpload = () => {
    inputFileRef?.current && inputFileRef.current.click();
  };

  const onUpload = (e: any) => {
    const selectedFile = e.target.files[0];
    setValue("image", selectedFile);
    console.log(formState);
    setPreviewImage(URL.createObjectURL(selectedFile));
  };

  return (
    <div className={styles["user"]}>
      <div className={styles["user-left"]}>
        <div className={styles["user-left__info"]}>
          <Input
            control={control}
            name="email"
            placeholder="Email"
            label="Email"
          />
          <Input
            control={control}
            name="firstName"
            placeholder="First Name"
            label="First Name"
          />
          <Input
            control={control}
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
          />
          <Input
            control={control}
            name="phoneNumber"
            placeholder="Phone Number"
            label="Phone Number"
          />

          <Select
            label="Role"
            control={control}
            name="role"
            dataSource={roleList}
            placeholder="Select Role"
            size="2"
          />
        </div>
        <div className="d-flex gap--12">
          <Button color="gray" highContrast onSubmit={handleSubmit}>
            Save
          </Button>
          <Dialog.Close>
            <Button size="2" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
        </div>
      </div>

      <div className={styles["user-right"]}>
        <Text as="div" size="3" mb="1" weight="bold">
          Picture Profile
        </Text>
        <Avatar size="8" src={previewImage} fallback="A" />
        <Button color="gray" highContrast onClick={onClickUpload} type="button">
          Upload
        </Button>
        <input ref={inputFileRef} type="file" onChange={onUpload} hidden />
      </div>
    </div>
  );
};

export default UserForm;
