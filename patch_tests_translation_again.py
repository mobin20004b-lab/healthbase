import re

def update_test(filename, new_messages):
    with open(filename, "r") as f:
        text = f.read()

    # Replace the old flat messages structure with the nested one
    text = re.sub(r'const messages = \{[^\}]+\};', new_messages, text, flags=re.DOTALL)

    with open(filename, "w") as f:
        f.write(text)

health_passport_messages = """const messages = {
  Patient: {
    records: {
      healthPassport: "Health Passport",
      bloodType: "Blood Type",
      allergies: "Allergies"
    }
  }
};"""

lab_results_messages = """const messages = {
  Patient: {
    records: {
      testName: "Test Name",
      result: "Result",
      normalRange: "Normal Range"
    }
  }
};"""

update_test("src/tests/components/patient/HealthPassport.test.tsx", health_passport_messages)
update_test("src/tests/components/patient/LabResultsTable.test.tsx", lab_results_messages)
