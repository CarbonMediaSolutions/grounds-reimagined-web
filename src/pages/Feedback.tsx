import { useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TOTAL_STEPS = 7;

type FeedbackData = {
  overall_experience: string;
  staff_helpful: string;
  product_quality: string;
  store_experience: string;
  found_everything: string;
  email: string;
};

const Feedback = () => {
  const [step, setStep] = useState(0); // 0 = welcome, 1-5 = questions, 6 = email, 7 = thank you
  const [data, setData] = useState<FeedbackData>({
    overall_experience: "",
    staff_helpful: "",
    product_quality: "",
    store_experience: "",
    found_everything: "",
    email: "",
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const selectOption = (field: keyof FeedbackData, value: string) => {
    vibrate();
    setData((prev) => ({ ...prev, [field]: value }));
    setStep((s) => s + 1);
  };

  const submitFeedback = async (includeEmail: boolean) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        email: includeEmail ? email : null,
        phone: phone || null,
      };
      const { error } = await supabase.from("feedback_responses").insert(payload);
      if (error) throw error;

      // If email provided, also subscribe to mailing list
      if (includeEmail && email) {
        await supabase.functions.invoke("mailblaze-subscribe", {
          body: { email },
        });
      }

      setStep(7);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isPositive = () => {
    const positive = ["Excellent", "Good", "Yes, absolutely", "Yes"];
    const answers = [
      data.overall_experience,
      data.staff_helpful,
      data.product_quality,
      data.store_experience,
      data.found_everything,
    ];
    return answers.filter((a) => positive.includes(a)).length >= 3;
  };

  const progressPercent = step >= 1 && step <= 6 ? ((step) / TOTAL_STEPS) * 100 : 0;

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-6">
        <img src={logo} alt="The Grounds" className="h-24 w-auto mx-auto" />
      </div>

      {/* Progress bar - shown during questions */}
      {step >= 1 && step <= 6 && (
        <div className="w-full max-w-md mb-2">
          <p className="text-xs text-muted-foreground text-center mb-1">
            Step {step} of {TOTAL_STEPS}
          </p>
          <Progress value={progressPercent} className="h-2 bg-secondary" />
        </div>
      )}

      {/* Card container */}
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-card p-6 sm:p-8 animate-fade-in">

          {/* SCREEN 0: Welcome */}
          {step === 0 && (
            <div className="text-center space-y-6">
              <h1 className="text-2xl font-display font-bold text-foreground">
                We'd love your feedback
              </h1>
              <p className="text-muted-foreground">
                Help us improve your experience — it takes less than 30 seconds.
              </p>
              <Button
                size="lg"
                className="w-full text-lg"
                onClick={() => { vibrate(); setStep(1); }}
              >
                Start
              </Button>
            </div>
          )}

          {/* SCREEN 1: Overall Experience */}
          {step === 1 && (
            <div className="space-y-4 text-center">
              <h2 className="text-xl font-display font-semibold text-foreground">
                How was your experience today?
              </h2>
              <div className="space-y-3">
                {["Excellent", "Good", "Average", "Poor", "Very Poor"].map((opt) => (
                  <Button
                    key={opt}
                    variant="outline"
                    size="lg"
                    className="w-full text-base"
                    onClick={() => selectOption("overall_experience", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 2: Staff & Service */}
          {step === 2 && (
            <div className="space-y-4 text-center">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Were our staff helpful and friendly?
              </h2>
              <div className="space-y-3">
                {["Yes, absolutely", "Mostly", "Not really"].map((opt) => (
                  <Button
                    key={opt}
                    variant="outline"
                    size="lg"
                    className="w-full text-base"
                    onClick={() => selectOption("staff_helpful", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 3: Product Quality */}
          {step === 3 && (
            <div className="space-y-4 text-center">
              <h2 className="text-xl font-display font-semibold text-foreground">
                How would you rate the quality of our products?
              </h2>
              <div className="space-y-3">
                {["Excellent", "Good", "Average", "Poor"].map((opt) => (
                  <Button
                    key={opt}
                    variant="outline"
                    size="lg"
                    className="w-full text-base"
                    onClick={() => selectOption("product_quality", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 4: Store Experience */}
          {step === 4 && (
            <div className="space-y-4 text-center">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Was the store clean, well-stocked, and easy to shop?
              </h2>
              <div className="space-y-3">
                {["Yes", "Mostly", "No"].map((opt) => (
                  <Button
                    key={opt}
                    variant="outline"
                    size="lg"
                    className="w-full text-base"
                    onClick={() => selectOption("store_experience", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 5: Shopping Success */}
          {step === 5 && (
            <div className="space-y-4 text-center">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Did you find everything you were looking for?
              </h2>
              <div className="space-y-3">
                {["Yes", "Mostly", "No"].map((opt) => (
                  <Button
                    key={opt}
                    variant="outline"
                    size="lg"
                    className="w-full text-base"
                    onClick={() => selectOption("found_everything", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 6: Email / Phone Capture */}
          {step === 6 && (
            <div className="space-y-4 text-center">
              {isPositive() ? (
                <>
                  <h2 className="text-xl font-display font-semibold text-foreground">
                    Stay in touch (optional)
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Would you like to receive monthly specials and updates?
                  </p>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-base h-12"
                  />
                  <div className="space-y-2">
                    <Button
                      size="lg"
                      className="w-full"
                      disabled={submitting}
                      onClick={() => submitFeedback(true)}
                    >
                      {submitting ? "Submitting..." : "Submit & Join"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full"
                      disabled={submitting}
                      onClick={() => submitFeedback(false)}
                    >
                      Skip
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-display font-semibold text-foreground">
                    We'd love to make things right
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Would you like us to reach out and hear your feedback? Leave your number below — completely optional.
                  </p>
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-base h-12"
                  />
                  <div className="space-y-2">
                    <Button
                      size="lg"
                      className="w-full"
                      disabled={submitting}
                      onClick={() => submitFeedback(false)}
                    >
                      {submitting ? "Submitting..." : "Submit Feedback"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full"
                      disabled={submitting}
                      onClick={() => { setPhone(""); submitFeedback(false); }}
                    >
                      Skip
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* SCREEN 7: Thank You */}
          {step === 7 && (
            <div className="text-center space-y-6">
              <div className="text-5xl">🙏</div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                Thank you for your feedback!
              </h2>
              {isPositive() ? (
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Would you mind leaving us a quick Google review?
                  </p>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/search?sa=X&sca_esv=4e0bfa84728bf4dd&rlz=1C5CHFA_enPT1152PT1152&sxsrf=ANbL-n4_MPTIrJzbsJnVHd57yJpyZ29Acg:1774553596586&q=The+Grounds+Meat+%26+Deli+Reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDEyMTW2MDA3MzCxMLQwNrAwMN7AyPiKUT4kI1XBvSi_NC-lWME3NbFEQU3BJTUnUyEotSwztbx4ESshFQBBoaFhXwAAAA&rldimm=14245380760481830803&tbm=lcl&hl=en-FR&ved=2ahUKEwiR3Yimp76TAxU8nycCHYznBJ4Q9fQKegQIUBAG&biw=1920&bih=837&dpr=1#lkt=LocalPoiReviews",
                        "_blank"
                      )
                    }
                  >
                    ⭐ Leave a Review
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  We appreciate your feedback and will use it to improve.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
