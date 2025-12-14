import AsyncButton from '../../_shared/AsyncButton/AsyncButton';

const ConsentCreateForm = ({ formData, setFormData, onSubmit, isSubmitting }) => {
  return (
    <div className="create-consent-form">
      <h3>Create New Consent</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Patient ID</label>
          <input
            type="text"
            value={formData.patientId}
            onChange={(e) =>
              setFormData({ ...formData, patientId: e.target.value })
            }
            required
            placeholder="e.g., patient-001"
          />
        </div>

        <div className="form-group">
          <label>Purpose</label>
          <select
            value={formData.purpose}
            onChange={(e) =>
              setFormData({ ...formData, purpose: e.target.value })
            }
            required
          >
            <option value="">Select purpose...</option>
            <option value="Research Study Participation">
              Research Study Participation
            </option>
            <option value="Data Sharing with Research Institution">
              Data Sharing with Research Institution
            </option>
            <option value="Third-Party Analytics Access">
              Third-Party Analytics Access
            </option>
            <option value="Insurance Provider Access">
              Insurance Provider Access
            </option>
          </select>
        </div>

        <AsyncButton
          className="submit-btn"
          type="submit"
          isLoading={isSubmitting}
          loadingText="Signing…"
        >
          Sign & Create Consent
        </AsyncButton>

      </form>
    </div>
  );
};

export default ConsentCreateForm;

