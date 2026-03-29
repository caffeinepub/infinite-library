import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import OutCall "http-outcalls/outcall";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  /// Fetches the first 50,000 chars of plain text from Project Gutenberg.
  /// There is no native JSON parsing in Motoko. Only use the backend for up to 2MB.
  public shared ({ caller }) func fetchGutenbergText(url : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch Gutenberg texts");
    };
    let result = await OutCall.httpGetRequest(url, [], transform);
    let charIter = result.chars();
    let limitedIter = charIter.take(50_000);
    Text.fromIter(limitedIter);
  };
};
