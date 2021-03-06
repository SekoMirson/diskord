import React from "react";
import { Button } from "../../button/button";

class CreateGuildForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      formType: "",
      guildName: ""
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleCreateGuild = this.handleCreateGuild.bind(this);
    this.handleJoinGuild = this.handleJoinGuild.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.update = this.update.bind(this);
  }

  toggleForm(formType) {
    this.setState({ clicked: true, formType: formType });
  }

  handleCreateGuild(e) {
    e.preventDefault();
    this.props.removeErrors();
    const formData = new FormData();
    formData.append("guild[name]", this.state.guildName);
    formData.append("guild[owner_id]", this.props.currentMemberId);
    if (this.state.photoFile) {
      formData.append("guild[emblem]", this.state.photoFile);
    }
    this.props.createGuild(formData);
  }

  handleJoinGuild(e) {
    e.preventDefault();
    this.props.removeErrors();
    this.props.joinGuild(this.state.guildName);
  }

  handleUpload(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({
        imageUrl: reader.result,
        photoFile: file
      });
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", photoFile: null });
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.guilds !== this.props.guilds) {
      this.props.closeModal();
    }
  }

  render() {
    let { clicked, formType, imageUrl } = this.state;
    const preview = imageUrl ? (
      <img className="image-preview" src={imageUrl} />
    ) : null;
    const { errors } = this.props;
    if (!clicked) {
      return (
        <div className="guild-membership-form">
          <div className="diskord-blue guild-member-form-header">
            OH, ANOTHER GUILD HUH?
          </div>
          <div className="create-join-guild-buttons">
            <div className="create-guild-form">
              <div className="diskord-blue">CREATE</div>
              <div className="create-guild-instructions">
                Create a new guild and invite your friends. It's free!
              </div>
              <img
                className="create-guild-icon"
                src={createguildicon}
                alt="createguildicon"
              />
              <Button
                color="blue"
                onClick={e => {
                  this.toggleForm("createGuild");
                  this.props.removeErrors();
                }}
              >
                Create a guild
              </Button>
            </div>
            <div className="create-guild-form">
              <div className="diskord-green">JOIN</div>
              <div className="create-guild-instructions">
                Enter a guild name and join your friend's guild.
              </div>
              <img
                className="create-guild-icon"
                src={joinguildicon}
                alt="createguildicon"
              />
              <Button
                color="green"
                onClick={e => {
                  this.toggleForm("joinGuild");
                  this.props.removeErrors();
                }}
              >
                Join a guild
              </Button>
            </div>
          </div>
        </div>
      );
    }
    if (clicked) {
      if (formType === "createGuild") {
        return (
          <div className="create-join-form">
            <div className="create-join-form-headers">
              <div className="diskord-blue create-join-form-main-header">
                CREATE YOUR GUILD
              </div>
              <div className="create-join-form-sub-header">
                By creating a guild, you will have access to free text chat to
                use amongst your guild members.
              </div>
            </div>
            <div className="create-join-form-input-container">
              <div className="create-guild-input-container">
                <div className="create-join-input-label-container">
                  <div className="create-guild-input-label">GUILD NAME</div>
                  <div className="validation-error-text">{errors}</div>
                </div>
                <input
                  spelllcheck="false"
                  placeholder={`${this.props.currentMember}'s guild`}
                  className="create-guild-name-input"
                  type="text"
                  value={this.state.guildName}
                  onChange={this.update("guildName")}
                />
                <div className="create-guild-community-guidelines">
                  By creating a guild, you agree to Diskord's Community
                  Guidelines
                </div>
              </div>

              {/* <label class="message-image-upload">
                +
                <input type="file" onChange={this.handleUpload} />
              </label> */}

              <div className="guild-icon-upload-container">
                <div className="guild-icon-upload-circle-container">
                  <label className="guild-icon-upload">
                    {preview}
                    <input type="file" onChange={this.handleUpload} />
                  </label>
                </div>
                <div className="guild-icon-size-instructions">
                  Minimum size: <b>128x128</b>
                </div>
              </div>
            </div>
            <div className="create-join-form-footer">
              <Button
                color="green"
                onClick={() => this.setState({ clicked: false })}
              >
                BACK
              </Button>
              <Button
                color="blue"
                onClick={e => {
                  this.handleCreateGuild(e);
                  this.props.removeErrors();
                }}
              >
                Create
              </Button>
            </div>
          </div>
        );
      } else if (formType === "joinGuild") {
        return (
          <div className="create-join-form">
            <div className="create-join-form-headers">
              <div className="create-join-form-sub-header">
                Enter a guild name below to join an existing guild.
              </div>
            </div>
            <div className="create-join-form-input-container">
              <div className="join-guild-input-container">
                <div className="create-join-input-label-container">
                  <div className="create-guild-input-label">GUILD NAME</div>
                  <div className="validation-error-text">{errors}</div>
                </div>
                <input
                  placeholder={`App Academy`}
                  className="create-guild-name-input"
                  type="text"
                  value={this.state.guildName}
                  onChange={this.update("guildName")}
                />
                <div className="create-guild-community-guidelines">
                  Looking for other servers to join? Try 'Hidden Ruby Gem',
                  'Bleats Fans', or 'Sleep And Code'! Note: Case Sensitive
                </div>
              </div>
            </div>
            <div className="create-join-form-footer">
              <Button
                color="blue"
                onClick={() => this.setState({ clicked: false })}
              >
                BACK
              </Button>
              <Button
                onClick={e => {
                  this.props.removeErrors();
                  this.handleJoinGuild(e);
                }}
                color="green"
              >
                Join
              </Button>
            </div>
          </div>
        );
      }
    }

    return <div>You reached the end of this multipart component</div>;
  }
}

export default CreateGuildForm;
